import { useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


const imagesArr = [
    'https://images.unsplash.com/photo-1614020661596-366a1afbb319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlJTIwQXBwfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1663153204614-6dfc8feebbf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9iaWxlJTIwQXBwfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1722209813892-147158a0d4ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vYmlsZSUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1597075095391-f15c2f9f359a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vYmlsZSUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1722209813944-a4ee13b7bfd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vYmlsZSUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D'
]
export default function ImageGallery(){
    const [image,setimage] = useState(imagesArr)
  return (
    <SafeAreaView style={{flex:1}}>
        <FlatList 
        data={imagesArr}
        keyExtractor={(data)=> data}
        renderItem={(item)=>{
            return(
                <Image style={{height: 200, aspectRatio: 4/2}}
                source={{uri: item}}
                />
            )
        }}
        />
    </SafeAreaView>
  )
}