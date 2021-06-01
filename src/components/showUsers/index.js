import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";
import { globalStyle, color } from "../../utility";
import { Divider } from 'react-native-elements'

export default ({ name, img, onImgTap, onNameTap, showLastMsg }) => {
    return (
        // <Card style={styles.cardStyle}>
        //     <CardItem style={styles.cardItemStyle} onPress={onNameTap}>
        //         <Left>
        // <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
        //     {img ? (<Thumbnail source={{ uri: img }} resizeMode="cover" />) : (
        //         <View><Text style={styles.thumbnailName}>{name.charAt(0)}</Text></View>
        //     )}
        // </TouchableOpacity>

        //             <Body>
        //                 <Text style={styles.profileName} onPress={onNameTap}>
        //                     {name}
        //                 </Text>
        //             </Body>
        //         </Left>
        //     </CardItem>
        // </Card>
        <View style={{ backgroundColor: color.SEMI_TRANSPARENT, marginHorizontal: 10 }}>
            <TouchableOpacity onPress={onNameTap}>
                <View style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 10, backgroundColor: color.SEMI_TRANSPARENT, flexDirection: 'row', marginBottom: 20 }}>
                    <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
                        {img ? (<Thumbnail source={{ uri: img }} resizeMode="cover" />) : (
                            <View><Text style={styles.thumbnailName}>{name.charAt(0)}</Text></View>
                        )}
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                        <Text style={styles.profileName} onPress={onNameTap} >
                            {name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* <Divider style={{ color: 'white', marginVertical: 3 }} /> */}
        </View>
    );
};

// import React from "react";
// import { Text, TouchableOpacity, View, Image } from "react-native";
// import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
// import styles from "./styles";
// import { globalStyle, color } from "../../utility";
// import { Divider } from 'react-native-elements'

// export default ({ name, img, onImgTap, onNameTap, showLastMsg }) => {
//     return (
//         // <Card style={styles.cardStyle}>
//         //     <CardItem style={styles.cardItemStyle} onPress={onNameTap}>
//         //         <Left>
//         // <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
//         //     {img ? (<Thumbnail source={{ uri: img }} resizeMode="cover" />) : (
//         //         <View><Text style={styles.thumbnailName}>{name.charAt(0)}</Text></View>
//         //     )}
//         // </TouchableOpacity>

//         //             <Body>
//         //                 <Text style={styles.profileName} onPress={onNameTap}>
//         //                     {name}
//         //                 </Text>
//         //             </Body>
//         //         </Left>
//         //     </CardItem>
//         // </Card>
//         <View style={{ backgroundColor: color.SEMI_TRANSPARENT, marginHorizontal: 10 }}>
//             <TouchableOpacity onPress={onNameTap}>
//                 <View style={{ borderColor: 'white', borderWidth: 1, borderRadius: 10, padding: 10, backgroundColor: color.SEMI_TRANSPARENT, marginBottom: 20, flexDirection: 'row' }}>
//                     <View>
//                         <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>{img ? (<Thumbnail source={{ uri: img }} resizeMode="cover" />) : (<View><Text style={styles.thumbnailName}>{name.charAt(0)}</Text></View>)}</TouchableOpacity>
//                     </View>
//                     <View>
//                         <View style={{ justifyContent: 'center' }}>
//                             <Text style={styles.profileName} onPress={onNameTap} >{name}</Text>
//                         </View>
//                         <Text style={{ fontSize: 14, color: color.WHITE, marginLeft: 10 }} onPress={onNameTap} >
//                             {showLastMsg}
//                         </Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             {/* <Divider style={{ color: 'white', marginVertical: 3 }} /> */}
//         </View>
//     );
// };
