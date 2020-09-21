{
  entities: {
    users: {
      1: {
        id: 1,
        username: "yuzinu",
        avatar: "some_url",
        joinedServers: [1, 11]
      },
      11: {
        id: 11,
        username: "junipoo",
        avatar: "some_url",
        joinedServers: [1, 3, 23]
      },
      17: {
        id: 17,
        username: "cheesebunnie",
        avatar: "some_url",
        joinedServers: [1, 3, 8]
      }
    },
    servers: {
      1: {
        id: 1,
        ownerId: 1,
        name: "pubstompers",
        icon: "some_url",
        channelIds: [1, 2],
        memberIds: [1, 2, 3],
      },
      2: {
        id: 2, 
        ownerId: 2,
        name: "App Academy FAANG squad",
        icon: "some_url",
        channelIds: [3],
        memberIds: [1, 17, 23],
      },
      3: {
        id: 3,
        ownerId: 3,
        name: "Musty Fam",
        icon: "some_url",
        channelIds: [4],
        memberIds: [],
      }
    },
    channels: {
      1: {
        id: 1,
        name: "#general",
        serverId: 2,
        messageIds: [1, 2, 3, 4]
      },
      11: {
        id: 11,
        name: "#interview prep",
        serverId: 2,
        messageIds: [5, 6, 7, 8]
      },
      17: {
        id: 17,
        name: "#algos",
        serverId: 2,
        messageIds: [9, 10, 11]
      }
    },
    messages: {
      1: {
        id: 1,
        body: "Welcome to the algorithm channel!",
        authorId: 1,
        channelId: 17,
      },
      2: {
        id: 2,
        body: "We are going to start with easy problems",
        authorId: 1,
        channelId: 17,
      },
      3: {
        id: 3,
        body: "If you can't get it the first time, don't get discouraged",
        authorId: 1,
        channelId: 17,
      }
    },
  },
  errors: {
    login: ["Username is taken", "Username and Password combination do not match"]
  },
  session: { currentUserId: 11},
  ui: { modal: null, loading: false }
}