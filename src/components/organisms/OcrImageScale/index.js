import React from 'react';
import styled from 'styled-components';
import {addEvent} from '../../util';
const ModalBtn = styled.div`
  text-align:center;
  position:absolute;
  height:38px;
  padding-top:10px;
  background:rgba(42,43,45,.6);
  left:0;
  bottom:0;
  right:0;
  margin:auto;
  width:220px;
`;
const SliderCon = styled.div`
  overflow: hidden;
  width: 100%;
  height:450px;
  margin:0 auto;
`;
const ShrinkBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -72px 0px;
`;
const ZoomBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -90px 0px;
`;
const RestoreBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -108px 0px;
`;
const LeftBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -126px 0px;
`;
const RightBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -144px 0px;
`;
class OcrImageScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deg: 0,
      scale:1,
    };
  }
  transForm = (n) => {
    const _n = this.state.deg + n;
    this.setState({deg: _n});
  };
  scaleFnc = (n) => {
    const _n = this.state.scale + n;
    if(_n === 0) {
      return;
    }
    if(_n === 6) {
      return;
    }
    this.setState({scale: _n});
  };
  myPreventDefault = (eOBJ) => {
    if(eOBJ.preventDefault){
      eOBJ.preventDefault();
    }
    else{
      eOBJ.retrunValue = false;
    }
  };
  componentDidMount(){
    addEvent(this.imgBox,"mousewheel",(event) => {
      if(event.delta < 0){
        this.scaleFnc(-0.5);
      }else{
        this.scaleFnc(0.5);
      }
    })
  };
  render () {
    const {path,thumbPath} = this.props;
    const {deg,scale} = this.state;
    return (
      <div>
        <SliderCon>
          <ul ref={ref=>this.imgBox = ref} style={{width:'100%',height:'450px',overflow:'hidden',position:'relative'}}>
            <li ref={ref=>this.img = ref}
                style={{
                  transform: `scale(${scale},${scale}) rotate(${deg}deg)`,
                  width:'100%',
                  height:'450px',
                  position:'absolute',
                  left:0,
                  top:0,
                }}
                onMouseDown={(e)=>{
                  e = e || event;
                  this.myPreventDefault(e);
                  let left1 = e.clientX - this.img.offsetLeft;
                  let top1 = e.clientY - this.img.offsetTop;
                  this.imgBox.onmousemove = (e)=>{
                    e = e || event;
                    let x = e.clientX;
                    let y = e.clientY;
                    this.img.style.left = x - left1 + "px";
                    this.img.style.top = y - top1 + "px";
                  }
                }}
                onMouseUp={()=>{
                  this.imgBox.onmousemove=null;
                }}>
                <img src={path+'?imageMogr2/auto-orient'} style={{maxHeight:'450px',margin:'0 auto',cursor:'move',display:'block'}}/>
            </li>
          </ul>
        </SliderCon>
        <ModalBtn>
          <ShrinkBtn onClick={()=>{this.scaleFnc(-0.5)}}/>
          <LeftBtn onClick={()=>{this.transForm(-90)}}/>
          <RestoreBtn onClick={()=>{
            this.setState({deg:0,scale:1});
            this.img.style.left = 0;
            this.img.style.top = 0;
          }}/>
          <RightBtn onClick={()=>{this.transForm(90)}}/>
          <ZoomBtn onClick={()=>{this.scaleFnc(0.5)}}/>
        </ModalBtn>
      </div>
    )
  }

}


export default OcrImageScale;
