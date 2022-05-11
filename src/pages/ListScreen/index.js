import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Container, Text, Button} from './styles';

export default () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>LIST</Text>
      <Button title="EDIT" onPress={() => navigation.navigate('EditNote')} />
    </Container>
  );
};
