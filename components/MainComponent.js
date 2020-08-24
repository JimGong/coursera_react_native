import React, {Component} from 'react';
import Menu from "./MenuComponent";
import {DISHES} from "../shared/dishes";
import Dishdetail from "./DishdetailComponent";
import {View, Platform} from "react-native";
import {createStackNavigator} from 'react-navigation';
import Expo from 'expo';

const MenuNavigator = createStackNavigator(
		{
			Menu: {screen: Menu},
			Dishdetail: {screen: Dishdetail}
		},
		{
			initialRouteName: 'Menu',
			navigationOptions: {
				headerStyle: {
					backgroundColor: "#512DA8"
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					color: "#fff"
				}
			}
		}
);

class Main extends Component {


	onDishSelect(dishId) {
		this.setState({selectedDish: dishId})
	}

	render() {
		return (
				<View style={{flex: 1}}>
					<MenuNavigator/>
				</View>
		)
	}
}

export default Main;