// Services
import { wapService } from '../../../../services/wap.service';
// Cmps
import { WapTxt } from './WapTxt';
import { WapImg } from './WapImg';
import { WapBtn } from './WapBtn';
import { WapDiv } from './WapDiv';
import { WapVideo } from './WapVideo';
import { WapInput } from './WapInput';

export function DynamicCmp(props) {
   const { cmp } = props;

   let style = {};
   if (cmp.style) {
      style = wapService.getScaleUnits(cmp.style);
   }

   switch (cmp.type) {
      case 'txt': return <WapTxt {...props} style={style} />
      case 'img': return <WapImg  {...props} style={style} />
      case 'btn': return <WapBtn {...props} style={style} />
      case 'container': return <WapDiv  {...props} style={style} />
      case 'video': return <WapVideo  {...props} style={style} />
      case 'input': return <WapInput  {...props} style={style} />
   }
}