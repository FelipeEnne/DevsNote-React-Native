import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {
  Container,
  AddButton,
  AddButtonImage,
  NoteList,
  NoNotes,
  NoNotesImage,
  NoNotesText,
} from './styles';
import NoteItem from '../../components/NoteItem';

export default () => {
  const navigation = useNavigation();
  const list = useSelector(state => state.notes.list);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Your notes',
      headerRight: () => (
        <AddButton
          underlayColor="transparent"
          onPress={() => navigation.navigate('EditNote')}>
          <AddButtonImage
            pointerEvents="none"
            source={require('../../assets/more.png')}
          />
        </AddButton>
      ),
    });
  }, []);

  const handleNotePress = index => {
    navigation.navigate('EditNote', {key: index});
  };

  return (
    <Container>
      {list.length > 0 && (
        <NoteList
          data={list}
          renderItem={({item, index}) => (
            <NoteItem data={item} index={index} onPress={handleNotePress} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      {list.length == 0 && (
        <NoNotes>
          <NoNotesImage source={require('../../assets/note.png')} />
          <NoNotesText>No notes</NoNotesText>
        </NoNotes>
      )}
    </Container>
  );
};
