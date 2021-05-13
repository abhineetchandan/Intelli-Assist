import PushNotification from 'react-native-push-notification';
import NotificationHandler from './notificationhandler';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
    
    PushNotification.getChannels(function(channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: "arabic", // (required)
        channelName: `arabic`, // (required)
        channelDescription: "Make you aware of task you have to do", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "polish", // (required)
        channelName: `polish`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "bangla", // (required)
        channelName: `bangla`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "japanese", // (required)
        channelName: `japanese`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "russian", // (required)
        channelName: `russian`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
  
    PushNotification.createChannel(
      {
        channelId: "english", // (required)
        channelName: `english`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "hindi", // (required)
        channelName: `hindi`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "french", // (required)
        channelName: `french`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "greek", // (required)
        channelName: `greek`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "mandarin", // (required)
        channelName: `mandarin`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "marathi", // (required)
        channelName: `marathi`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "tamil", // (required)
        channelName: `tamil`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "telugu", // (required)
        channelName: `telugu`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "portuguese", // (required)
        channelName: `portuguese`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "indonesian", // (required)
        channelName: `indonesian`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "turkish", // (required)
        channelName: `turkish`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "dutch", // (required)
        channelName: `dutch`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "spanish", // (required)
        channelName: `spanish`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "german", // (required)
        channelName: `german`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
    PushNotification.createChannel(
      {
        channelId: "italian", // (required)
        channelName: `italian`, // (required)
        channelDescription: "A sound  task reminder", // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
}
  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: "other than Task Reminder", // (required)
        channelName: `other than Task Reminder${this.lastChannelCounter}`, // (required)
        channelDescription: `A reminder channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) => console.log('InitialNotication:', notification));
  }

  scheduleNotification(Id, defaultDate, name, isDaily) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(defaultDate), // in 30 secs

      /* Android Only Properties */
      channelId: 'english',
      ticker: 'Task', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: `Time to do ${name}`, // (optional) default: "message" prop
      priority: 'max',
      subText: 'Hello, You have a Task', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 5000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'Task', // (optional) add tag to message
      group: 'Task', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ['OK GOT IT!', 'REMOVE THIS TASK NOW!'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    
      /* iOS only properties */
      category: '', // (optional) default: empty string
      
      /* iOS and Android properties */
      id: Id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: `Time for ${name}`, // (optional)
      message: `You should start doing this task called ${name}`, // (required)
      userInfo: { sceen: "HOME" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
      repeatType: function() {if(isDaily === true){ return 'day'} else return null},
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif(id) {
    PushNotification.cancelLocalNotifications({id: '' + id});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }

  getDeliveredNotifications(callback) {
    PushNotification.getDeliveredNotifications(callback);
  }
}
