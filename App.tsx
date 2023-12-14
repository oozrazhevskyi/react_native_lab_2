import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = {
  background: '#f7f7f7',
  primary: '#0084ff',
  secondary: '#ffffff',
};

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  quoteId: number;
  user: User;
}

const myUser: User = {
  id: 0,
  name: "Me",
  avatar: require("./static/images/0.png"),
}

const otherUser: User = {
  id: 1,
  name: "User 1",
  avatar: require("./static/images/1.png"),
}

const unknownUser: User = {
  id: 1,
  name: "Unknown user",
  avatar: "",
}


const messages: Message[] = [
  { id: 1, quoteId:0, user: otherUser, text: 'Привіт, як справи?' },
  { id: 2, quoteId:0, user: myUser,    text: 'Все чудово, дякую' },
  { id: 3, quoteId:0, user: otherUser, text: 'Коли зустрінемось?' },
  { id: 4, quoteId:0, user: myUser,    text: 'Як щодо вихідних?' },
  { id: 5, quoteId:99, user: otherUser, text: 'Добре, тоді спишемось.' },
];

const deletedMessage: Message = {
  id: 0,
  quoteId: 0,
  user: unknownUser,
  text: 'Це повідомлення було видалено',
}

const getMessage = (quoteId: number): Message => {
  return messages.find((msg=>msg.id == quoteId))??deletedMessage;
}

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const containerStyles = [
    styles.messageContainer,
    { alignSelf: message.user == myUser ? 'flex-end' : 'flex-start' },
  ];
  const quoteBlock = message.quoteId ? (
    <View style={styles.quoteBlock}>
      <View style={styles.replyDescriptionContainer}>
        <Icon name="reply" style={styles.replyIcon}/>
        <Text>
          {message.user.name} Replied to {getMessage(message.quoteId).user.name}
        </Text>
      </View>
      <Text style={styles.quoteText}>{getMessage(message.quoteId).text}</Text>
    </View>
  ) : null;
  let views = [
    <View style={styles.avatarContainer}>
      <Image source={message.user.avatar} style={styles.avatar} />
    </View>,
    <View>
      <Text style={styles.senderName}>{message.user.name}</Text>
      {quoteBlock}
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  ]

  if (message.user == myUser) {
    views.reverse();
  }

  return (
    <View style={containerStyles}>
      {views}
    </View>
  );
};

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
          <TouchableOpacity style={styles.chatIconContainer}>
            <Icon name='chevron-left' size={30}/>
            <Text style={styles.navbarText}>Chat</Text>
          </TouchableOpacity>
          <Text style={styles.navbarText}>Instamobile</Text>
          <TouchableOpacity style={styles.settingsIcon}>
            <Icon name='settings' size={30}/>
          </TouchableOpacity>
        </View>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageItem message={item} />}
          contentContainerStyle={styles.messagesContainer}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.cameraIcon}>
            <Icon name='camera-alt' size={30}/>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#bfbfbf"
          />
          <TouchableOpacity>
            <Icon name='send' size={30}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    paddingTop:0
  },
  messagesContainer: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    maxWidth: '80%',
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  messageText: {
    fontSize: 16,
  },
  senderName: {
    fontSize: 12,
    marginBottom: 4,
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  replyDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  quoteBlock: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  quoteText: {
    fontStyle: 'italic',
    color: '#666',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    height: 60,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  navbarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cameraIconText: {
    color: '#fff',
    fontSize: 20,
  },
  settingsIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIconText: {
    color: '#fff',
    fontSize: 20,
  },
  sendIconText: {
    color: '#EEE',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;