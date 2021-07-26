import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from "react-native";

import store from "../app/store/store";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";

const AppNavigatorStyle = (props) => {
  const BASE_PATH =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/";
  const proileImage = "react_logo.png";

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 15 }}>
      <TouchableOpacity
        style={{ width: 40, height: 30, alignSelf: "flex-end", marginTop: 15 }}
        onPress={() => props.navigation.toggleDrawer()}
      >
        <AntDesign
          style={{ alignSelf: "flex-end", paddingRight: 15 }}
          name="menu-unfold"
          size={30}
          color={appColors.black}
        />
      </TouchableOpacity>
      {/*Top Large Image */}
      <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      />
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          color: appColors.black,
          marginBottom: 15,
        }}
      >
        {store.getState().user.name}
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View> */}
      </DrawerContentScrollView>
      {/* <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        www.aboutreact.com
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AppNavigatorStyle;
