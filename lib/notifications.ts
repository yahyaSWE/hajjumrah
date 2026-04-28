import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import type { UserTaskWithTemplate } from '@/lib/types';

// Konfigurera hur notiser visas när appen är öppen
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Påminnelser',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function schedulePreparationReminders(
  tasks: UserTaskWithTemplate[],
  reminderHour: number = 9
): Promise<void> {
  await cancelAllReminders();

  const now = new Date();
  const incompleteTasks = tasks.filter((t) => !t.is_completed);

  for (const task of incompleteTasks) {
    const dueDate = new Date(task.due_date);
    dueDate.setHours(reminderHour, 0, 0, 0);

    // Schemalägg bara framtida notiser
    if (dueDate > now) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Förberedelse: ${task.template.title}`,
          body: task.template.description || 'Det är dags att förbereda dig.',
          data: { taskId: task.id, screen: 'plan/schedule' },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: dueDate,
        },
      });
    }
  }
}

export async function scheduleDepartureCountdown(
  departureDate: string,
  pilgrimageType: 'hajj' | 'umrah',
  reminderHour: number = 9
): Promise<void> {
  const label = pilgrimageType === 'hajj' ? 'Hajj' : 'Umrah';
  const dep = new Date(departureDate);
  const now = new Date();

  // 1 vecka före
  const weekBefore = new Date(dep);
  weekBefore.setDate(weekBefore.getDate() - 7);
  weekBefore.setHours(reminderHour, 0, 0, 0);

  if (weekBefore > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `En vecka kvar till din ${label}!`,
        body: 'Har du packat allt? Gå igenom din checklista en sista gång.',
        data: { screen: 'plan/schedule' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: weekBefore,
      },
    });
  }

  // Dagen före
  const dayBefore = new Date(dep);
  dayBefore.setDate(dayBefore.getDate() - 1);
  dayBefore.setHours(reminderHour, 0, 0, 0);

  if (dayBefore > now) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Imorgon börjar din pilgrimsfärd`,
        body: `Må Allah acceptera din ${label}. Bismillah!`,
        data: { screen: 'plan' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: dayBefore,
      },
    });
  }
}

export async function rescheduleAll(
  tasks: UserTaskWithTemplate[],
  departureDate: string,
  pilgrimageType: 'hajj' | 'umrah',
  reminderHour: number = 9
): Promise<void> {
  await schedulePreparationReminders(tasks, reminderHour);
  await scheduleDepartureCountdown(departureDate, pilgrimageType, reminderHour);
}
