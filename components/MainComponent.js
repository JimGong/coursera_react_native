import React, {Component} from 'react';
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import Dishdetail from "./DishdetailComponent";
import {View, Platform} from "react-native";
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import Contact from "./ContactComponent";
import About from "./AboutComponent";

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

const HomeNavigator = createStackNavigator(
		{
			Home: {screen: Home}
		},
		{
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

const ContactNavigator = createStackNavigator(
		{Contact: {screen: Contact}},
		{
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
const AboutNavigator = createStackNavigator(
		{About: {screen: About}},
		{
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
)
const MainNavigator = createDrawerNavigator({
			About: {
				screen: AboutNavigator,
				navigationOptions: {
					title: "About", drawerLabel: "About"
				}
			},
			Home: {
				screen: HomeNavigator,
				navigationOptions: {
					title: 'Home', drawerLabel: "Home"
				}
			},
			Menu: {
				screen: MenuNavigator,
				navigationOptions: {
					title: 'Menu', drawerLabel: "Menu"
				}
			},
			Contact: {
				screen: ContactNavigator,
				navigationOptions: {
					title: "Contact", drawerLabel: "Contact"
				}
			},
			// About: {
			// 	screen: AboutNavigator,
			// 	navigationOptions: {
			// 		title: "About", drawerLabel: "About"
			// 	}
			// }
		}, {
			drawerBackgroundColor: "#D1C4E9",
		}
)

class Main extends Component {


	onDishSelect(dishId) {
		this.setState({selectedDish: dishId})
	}

	render() {
		return (
				<View style={{flex: 1}}>
					<MainNavigator/>
				</View>
		)
	}
}

export default Main;