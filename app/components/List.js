import React from "react";
import { FlatList } from "react-native";
import { View } from "react-native";

export default function AppList({ data, extraData, renderItem }) {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={extraData}
        fadingEdgeLength={100}
      />
    </View>
  );
}
