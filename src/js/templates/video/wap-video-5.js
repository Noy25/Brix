import { txtStyle, btnStyle, imgStyle, inputStyle, containerStyle, videoStyle } from '../default-styles';


export const wapVideo_5 = {
   "id": "246246tlwksdjflakjfadf",
   "type": "container",
   "category": "wap-video",
   "className": "wap-form-5",
   "thumbnail": "http://res.cloudinary.com/dpmzxdfuh/image/upload/v1643703019/hz2cwx5sprxtfu9wbeuw.jpg",
   "style": { ...containerStyle, "paddingInline": "40", "paddingBlock": "60", "backgroundColor": "#0b0b0b" },
   "cmps": [
      // INNER CONTAINER
      {
         "id": "ajlk1235jtlskdcj35yegfh",
         "type": "container",
         "className": "inner-container flex justify-center align-center",
         "style": { ...containerStyle, "paddingInline": "0", "paddingBlock": "0", "backgroundColor": "transparent" },
         "cmps": [
            // VIDEO
            {
               "id": "l136k5tjlqkdtjflk2q13j56tlwketjlwkej",
               "type": "video",
               "className": "wap-video-5",
               "url": "https://www.youtube.com/embed/ZCFkWDdmXG8",
               "style": { ...videoStyle }
            },
            //FORM
            {
               "id": "p5oj673po5jrslkcgjbslkj24",
               "type": "container",
               "style": { ...containerStyle, "paddingInline": "0", "paddingBlock": "0", "backgroundColor": "#ffffff00" },
               "className": "form flex column",
               "cmps": [
                  //TITLE
                  {
                     "id": "2j436lkjwdlkfjlszdkfjsdf",
                     "type": "txt",
                     "txt": "Contact",
                     "style": { ...txtStyle, "color": "#fcfcfc", "fontSize": "35", "fontFamily": "bitter" },
                  },
                  {
                     "id": "246hldkfjlkwejdtl2kj4e6t",
                     "type": "txt",
                     "txt": "Leave your details down below and we'll contact you",
                     "style": { ...txtStyle, "color": "#bebebe", "fontFamily": "bitter" },
                  },
                  {
                     "id": "3o4i6jwodisjvlcxsijvlk3je5",
                     "type": "input",
                     "inputType": "text",
                     "label": "Full Name",
                     "placeholder": "e.g. John Doe",
                     "style": { ...inputStyle, "fontSize": "22", "color": "#fcfcfc" }
                  },
                  {
                     "id": "vbsmfht45ktgw346347yufe",
                     "type": "input",
                     "inputType": "email",
                     "label": "Email",
                     "placeholder": "e.g. johnny2@gmail.com",
                     "style": { ...inputStyle, "fontSize": "22", "color": "#fcfcfc" }
                  },
                  {
                     "id": "cvw642htywgdljlk24j6lsk",
                     "type": "input",
                     "inputType": "text",
                     "label": "Phone Number",
                     "placeholder": "e.g. +972-50-824-3504",
                     "style": { ...inputStyle, "fontSize": "22", "color": "#fcfcfc" }
                  },
                  {
                     "id": "u456tjh1d6f5bw3r7yu4ef5j",
                     "type": "btn", // SUBMIT BTN
                     "url": "#",
                     "txt": "Submit",
                     "className": "submit-btn",
                     "style": { ...btnStyle, "color": "#fcfcfc", "fontSize": "20" }
                  }
               ]
            }
         ]
      }
   ]
}