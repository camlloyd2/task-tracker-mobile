import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {graphql, ApolloProvider} from 'react-apollo';
import {ApolloClient, createNetworkInterface} from 'apollo-client';
import gql from 'graphql-tag';

import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import {mockNetworkInterfaceWithSchema} from 'apollo-test-utils';
import {typeDefs} from './schema';
import {List, ListItem, Content} from 'native-base';

const schema = makeExecutableSchema({typeDefs});
addMockFunctionsToSchema({schema});
const mockNetworkInterface = mockNetworkInterfaceWithSchema({schema});
const client = new ApolloClient({
  networkInterface: createNetworkInterface(
    'https://api.graph.cool/simple/v1/cj5d1z5z9ko7a0122361xaldt'
  ),
});

const TaskList = ({data: {loading, error, allTasks}}) => {
  if (loading) {
    return (
      <Content>
        <Text> Loading... </Text>
      </Content>
    );
  }
  if (error) {
    return (
      <Content>
        <Text>
          {error.message}
        </Text>
      </Content>
    );
  }
  return (
    <List>
      {allTasks.map(task =>
        <ListItem key={task.id}>
          <Text>
            {task.name}
          </Text>
        </ListItem>
      )}
    </List>
  );
};

const taskListQuery = gql`
  query TasklistQuesry {
    allTasks {
      id
      name
    }
  }
`;

const TaskListWithData = graphql(taskListQuery)(TaskList);

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
          <TaskListWithData />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
