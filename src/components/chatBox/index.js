// import React from "react";
// import { View, Text, Image } from "react-native";
// import { Card, CardItem } from "native-base";
// import { deviceWidth } from "../../utility/style/appStyle";
// import { uuid } from "../../utility/constants";
// import styles from "./styles";
// import { color } from "../../utility";
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default ({ userId, msg, img, onImgTap }) => {
//     let isCurrentUser = userId === uuid ? true : false;
//     return (
//         <Card
//             transparent
//             style={{ maxWidth: deviceWidth / 2 + 10, alignSelf: isCurrentUser ? "flex-end" : "flex-start", }}
//         >
//             <View
//                 style={[
//                     styles.chatContainer,
//                     isCurrentUser && {
//                         borderTopLeftRadius: 17,
//                         borderTopRightRadius: 0,
//                         backgroundColor: color.DARK_GRAY,
//                     },
//                 ]}
//             >
//                 {img ? (
//                     <CardItem cardBody>
//                         <TouchableOpacity onPress={onImgTap} style={{ color: color.DARK_GRAY }}>
//                             <Image
//                                 source={{ uri: img }}
//                                 resizeMode="cover"
//                                 style={{ height: 250, width: deviceWidth / 1.7, borderRadius: 4 }}
//                             />
//                         </TouchableOpacity>
//                     </CardItem>
//                 ) : (
// <View>
//     <Text style={[styles.chatTxt, isCurrentUser && { color: color.WHITE }]}>
//         {msg}
//     </Text>
//     <Text style={[styles.chatTxt1, isCurrentUser && { color: color.WHITE }]}>
//         {new Date().toLocaleString().slice(11, 16)}
//     </Text>
// </View>
//                 )}
//             </View>
//         </Card>
//     );
// };

import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { Card, CardItem } from "native-base";
import { deviceWidth } from "../../utility/style/appStyle";
import { uuid } from "../../utility/constants";
import styles from "./styles";
import { color } from "../../utility";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatBox = ({ userId, msg, img, onImgTap }) => {
    let isCurrentUser = userId === uuid ? true : false;
    return (
        <Card
            transparent
            style={{
                maxWidth: deviceWidth / 2 + 10,
                alignSelf: isCurrentUser ? "flex-end" : "flex-start",
            }}
        >
            <View
                style={[
                    styles.chatContainer,
                    isCurrentUser && {
                        borderTopLeftRadius: 17,
                        borderTopRightRadius: 0,
                        backgroundColor: color.DARK_GRAY,
                    },
                ]}
            >
                {img ? (
                    <CardItem cardBody>
                        <TouchableOpacity onPress={onImgTap}>
                            <Image
                                source={{ uri: img }}
                                resizeMode="cover"
                                style={{ height: 200, width: deviceWidth / 1.7 }}
                            />
                        </TouchableOpacity>
                    </CardItem>
                ) : (
                    <View>
                        <Text style={[styles.chatTxt, isCurrentUser && { color: color.WHITE }]} >
                            {msg}
                        </Text>
                        <Text style={[styles.chatTxt1, isCurrentUser && { color: color.WHITE }]}>
                            {new Date().toLocaleString().slice(11, 16)}
                        </Text>
                    </View>
                )
                }
            </View>
        </Card>
    );
};

export default ChatBox;