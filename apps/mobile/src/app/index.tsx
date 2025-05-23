import { Link, Stack } from 'expo-router'
import { Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  return (
    <SafeAreaView className=" bg-background">
      <Stack.Screen options={{ title: 'Home Page' }} />
      <View className="bg-background h-full w-full p-4">
        <Text>home</Text>
      </View>
    </SafeAreaView>
  )
}
