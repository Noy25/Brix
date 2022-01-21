import { txtStyle, btnStyle, imgStyle, containerStyle } from '../default-styles';

const IMG_URL = 'https://assets.website-files.com/5c6eb5400253230156de2bd6/5cdc00bd9bd8ea70674d1cbf_placeholder%203.svg';


export const wapCard_2 = {
    "id": "2p6jtdpsgojasd",
    "type": "container",
    "category": "wap-card",
    "name": "wap-card-2",
    "style": { ...containerStyle, "paddingInline": "30", "paddingBlock": "50" },
    "cmps": [
        {
            "id": "alkdfsjlk34jt5lksjxc",
            "type": "img", // CARD IMG (LEFT)
            "url": IMG_URL,
            "style": { ...imgStyle, "borderRadius": "30", "width": "100" }
        },
        {
            "id": "45356dgfasdf",
            "type": "container", // CARD TEXT CONTAINER (RIGHT)
            "style": { ...containerStyle },
            "cmps": [
                {
                    "id": "sdgkjlk34j6tlkscj",
                    "type": "txt", // TITLE
                    "txt": "ABOUT",
                    "style": { ...txtStyle, "color": "#0000008c", "fontSize": "12" }
                },
                {
                    "id": "zxc2l3k5jtrlad",
                    "type": "txt", // SUBTITLE
                    "txt": "Who we are",
                    "style": { ...txtStyle, "fontSize": "20" }
                },
                {
                    "id": "sdgjp573ojwptgjm",
                    "type": "txt", // PARAGRAPH
                    "txt": "Nulla vel sodales tellus, quis condimentum enim. Nunc porttitor venenatis feugiat. Etiam quis faucibus erat, non accumsan leo. Aliquam erat volutpat. Vestibulum ac faucibus eros. Cras ullamcorper gravida tellus ut consequat.",
                    "style": { ...txtStyle }
                }]
        }]
}