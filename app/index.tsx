import { useEffect, useState } from "react";
import { Image, FlatList, View, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const imagesArr = [
    'https://images.unsplash.com/photo-1614020661596-366a1afbb319?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlJTIwQXBwfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1663153204614-6dfc8feebbf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9iaWxlJTIwQXBwfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1722209813892-147158a0d4ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1vYmlsZSUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1597075095391-f15c2f9f359a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vYmlsZSUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1722209813944-a4ee13b7bfd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1vYmlsZSUyMEFwcHxlbnwwfHwwfHx8MA%3D%3D'
]
export default function ImageGallery(){
    const [image,setImage] = useState(imagesArr);
    useEffect(()=>{
    const loadImage = async () =>{
      const savedImage = await AsyncStorage.getItem('images');
      if (savedImage) {
        setImage((prevImages) => [...prevImages, savedImage]);
      }
    }
    loadImage()
    },[])
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.YOUR_CLOUD_NAME}/image/upload`;
    const uploadImageToCloudinary = async (imageuri: any): Promise<void> => {
        if (!image) {
          Alert.alert('No image selected', 'Please select an image first');
          return;
        }
    
        const data = new FormData();
        data.append('file', {
          uri: imageuri,
          type: 'image/jpeg',
          name: 'image',
        } as any);
        data.append('upload_preset', 'expo_image_gallery'); 
        data.append('folder', 'expo_image_gallery');
    
        try {
          const response = await axios.post(cloudinaryUrl, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const imageUrl = response.data.secure_url;
          setImage((prevImages) => [...prevImages, imageUrl]);
          await AsyncStorage.setItem('images', imageUrl);
          console.log('Image URL:', imageUrl);
          Alert.alert('Success', 'Image uploaded successfully');
          console.log('Cloudinary Response:', response.data);
        } catch (error) {
          console.error('Upload failed', error);
          Alert.alert('Upload failed', 'Something went wrong');
        }
      };
    
        const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          //  setImage([result.assets[0].uri])
           uploadImageToCloudinary(result.assets[0].uri)

        }
      };
    
      const pickImagefrontcamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if(permission.granted){  
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
            console.log(result);
        
            if (!result.canceled) {
            // setImage([result.assets[0].uri])
            uploadImageToCloudinary(result.assets[0].uri)
            }
        }
      };


  return (
    <SafeAreaView style={{flex:1,}}>
        <View style={{flexDirection: 'column', padding: 20, position: 'absolute', zIndex: 12, right: -12, gap: 10, marginTop: 20}}>
        <Entypo name="image" onPress={pickImage} size={24} color="black"  style={{backgroundColor: '#e4eaef', padding: 12, borderRadius: 125}}/>
        <Entypo name="camera" onPress={pickImagefrontcamera} size={24} color="black"  style={{backgroundColor: '#e4eaef', padding: 12, borderRadius: 125}}/>
        </View>
        <FlatList 
        data={image}
        keyExtractor={(data)=> data}
        renderItem={({item})=>{
            return(
                <Image style={{height: 230, marginVertical: 10}}
                source={{uri:item}}
                />
            )
        }}
        />
    </SafeAreaView>
  )
}