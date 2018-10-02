import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from './Button';
import {
  pressNum, enter, operation, clear, swap, toggleNegative,
} from './module';

const baseNumber = {
  backgroundColor: '#333',
  textAlign: 'right',
  padding: 10,
  fontSize: 40,
  borderBottomWidth: 1,
  borderColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 20,
  },
  bottom: {
    flex: 1,
  },
  append: {
    color: '#fff',
    ...baseNumber,
  },
  replace: {
    color: '#2E71E5',
    ...baseNumber,
  },
  push: {
    color: '#9bc23c',
    ...baseNumber,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});

export const App = ({
  calculatorState: { stack, inputState },
  pressNumWithDispatch,
  enterAction,
  operationAction,
  clearAction,
  swapAction,
  toggleNegativeAction,
}) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <TouchableOpacity onPress={() => toggleNegativeAction(2)}>
        <Text style={styles.append}>{stack[2] || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleNegativeAction(1)}>
        <Text style={styles.append}>{stack[1] || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleNegativeAction(0)}>
        <Text style={styles[inputState]}>{stack[0] || 0}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.bottom}>
      <View style={styles.row}>
        <Button text="C" onPress={clearAction} />
        <Button text="Pow" onPress={operationAction} />
        <Button text="Swap" onPress={swapAction} />
        <Button text="/" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="9" onPress={pressNumWithDispatch} />
        <Button text="8" onPress={pressNumWithDispatch} />
        <Button text="7" onPress={pressNumWithDispatch} />
        <Button text="X" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="6" onPress={pressNumWithDispatch} />
        <Button text="5" onPress={pressNumWithDispatch} />
        <Button text="4" onPress={pressNumWithDispatch} />
        <Button text="-" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="3" onPress={pressNumWithDispatch} />
        <Button text="2" onPress={pressNumWithDispatch} />
        <Button text="1" onPress={pressNumWithDispatch} />
        <Button text="+" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="0" onPress={pressNumWithDispatch} />
        <Button text="." onPress={pressNumWithDispatch} />
        <Button text="Enter" special onPress={enterAction} />
      </View>
    </View>
  </View>
);

export default connect(
  state => ({ calculatorState: state }),
  dispatch => bindActionCreators(
    {
      pressNumWithDispatch: pressNum,
      enterAction: enter,
      operationAction: operation,
      clearAction: clear,
      swapAction: swap,
      toggleNegativeAction: toggleNegative,
    },
    dispatch,
  ),
)(App);
