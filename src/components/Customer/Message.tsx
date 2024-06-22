import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CUSTOM_COLOR from '../../constants/color';

const Message = (props: any) => {
  return (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: props.isRight
              ? CUSTOM_COLOR.ChathamsBlue
              : CUSTOM_COLOR.White,
            alignSelf: props.isRight ? 'flex-end' : 'flex-start',
            borderTopRightRadius: props.isRight ? 1 : 15,
            borderTopLeftRadius: props.isRight ? 15 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: props.isRight ? CUSTOM_COLOR.White : CUSTOM_COLOR.Black },
          ]}
        >
          {props.content}
        </Text>
        <Text
          style={[
            styles.messageTime,
            { color: props.isRight ? CUSTOM_COLOR.White : CUSTOM_COLOR.Black },
          ]}
        >
          {props.time}
        </Text>
      </View>
      {props.isRight && props.isSeen && (
        <Text style={styles.seenText}>Seen</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    paddingVertical: 10,
  },
  messageBubble: {
    flexDirection: 'row',
    maxWidth: '80%',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 7,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 15,
    maxWidth: '80%',
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginLeft: 5,
  },
  seenText: {
    fontSize: 12,
    fontWeight: "bold",
    color: CUSTOM_COLOR.Gray,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 2,
  },
});

export default Message;
