import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import {
  Container,
  TitleInput,
  BodyInput,
  SaveButton,
  SaveButtonImage,
  CloseButton,
  CloseButtonImage,
  DeleteButton,
  DeleteButtonText,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const list = useSelector(state => state.notes.list);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    if (route.params?.key != undefined && list[route.params.key]) {
      setStatus('edit');
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: status == 'new' ? 'New note' : 'Edit note',
      headerLeft: () => (
        <CloseButton underlayColor="transparent" onPress={handleCloseButton}>
          <CloseButtonImage source={require('../../assets/close.png')} />
        </CloseButton>
      ),
      headerRight: () => (
        <SaveButton underlayColor="transparent" onPress={handleSaveButton}>
          <SaveButtonImage source={require('../../assets/save.png')} />
        </SaveButton>
      ),
    });
  }, [status, title, body]);

  const handleCloseButton = () => {
    navigation.goBack();
  };
  const handleSaveButton = () => {
    if (title != '' && body != '') {
      if (status == 'edit') {
        dispatch({
          type: 'EDIT_NOTE',
          payload: {key: route.params.key, title, body},
        });
      } else {
        dispatch({
          type: 'ADD_NOTE',
          payload: {title, body},
        });
      }
      navigation.goBack();
    } else {
      alert('Title or body is empty');
    }
  };
  const handleDeleteButton = () => {
    dispatch({
      type: 'DEL_NOTE',
      payload: {key: route.params.key},
    });
    navigation.goBack();
  };

  return (
    <Container>
      <TitleInput
        value={title}
        onChangeText={t => setTitle(t)}
        placeholder="Title"
        placeholderTextColor="#CCC"
        autoFocus={true}
      />
      <BodyInput
        value={body}
        onChangeText={t => setBody(t)}
        placeholder="Note"
        placeholderTextColor="#CCC"
        mutiline={true}
        textAlignVertical="top"
      />
      {status == 'edit' && (
        <DeleteButton underlayColor="#FF0000" onPress={handleDeleteButton}>
          <DeleteButtonText>Delete Note</DeleteButtonText>
        </DeleteButton>
      )}
    </Container>
  );
};
