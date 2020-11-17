const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BOa1lXoXcRGuzGl9S2c4FfC1lCaMub-p1U4X1USr4C9JvOqdfSyGN78YjZJbS97d_dpX0Ts4NsocvhtuSSkR61s",
  privateKey: "QEa96LJU9pZ3RsrtPpnu4cZS9l18xxUhPG_FbC83mFE",
};

webPush.setVapidDetails(
  "mailto:iban.ninja@@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cO2ogHxV75Q:APA91bEecrJ_dFy2y-NpsKp-0_Q6FaaGWvLXruitB7WWIKiawQV3rGmxaQl1FRmZjsa-ihBYD8IHivbNjkvumTE2tXK8_Q2P4tTLDgy3kPB1UE2qhIi1cDKKrbN38suxnfkQJoKOgvxO",
  keys: {
    p256dh:
      "BCNFXuW5Q53S95Fsf1XKT7oy0Ao++gTugCidx89b50I9ZhheNoLVF4Tg50xVpdoV4u5vurkah6O+hcIT2nqnJpg=",
    auth: "xGHbZgJ7vM+oUYofCO1KuA==",
  },
};
const payload = "Notifikasi dari Premier League App";

const options = {
  gcmAPIKey: "1010726380069",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
