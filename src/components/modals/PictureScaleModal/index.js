import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import {addEvent} from '../../util';
const ModalBtn = styled.div`
  text-align:center;
  padding-top:10px;
  height:40px;
  background:rgba(42,43,45,.6);
  width:300px;
  position:absolute;
  left:0;
  right:0;
  margin:auto;
  bottom:0;
`;
const SliderCon = styled.div`
  overflow: hidden;
  width: 96%;
  height:520px;
  margin:10px auto;
  position:relative;
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
const LeftToBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -162px 0px;
`;
const RightToBtn = styled.span`
  display:inline-block;
  width:18px;
  height:18px;
  margin:0 8px;
  cursor:pointer;
  background:url(images/invoice.png) no-repeat -180px 0px;
`;
class PictureScaleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: this.props.index?this.props.index:0,
      deg: 0,
      scale:1,
    };
  }
  turn = (n) => {
    let _n = this.state.nowLocal + n;
    if(_n < 0) {
      return;
    }
    if(_n >= this.props.items.length) {
      return;
    }
    this.setState({nowLocal: _n,deg:0,scale:1});
    this.img.style.left = 0;
    this.img.style.top = 0;
  };
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
    const {onCancel,items} = this.props;
    const {nowLocal,deg,scale} = this.state;
    return (
      <div>
        <Modal
          visible
          onCancel={onCancel}
          width="60%"
          footer={null}
        >
          <SliderCon>
            <ul ref={ref=>this.imgBox = ref} style={{width:'100%',height:'520px',overflow:'hidden',position:'relative'}}>
              <li ref={ref=>this.img = ref}
                  style={{
                    transform: `scale(${scale},${scale}) rotate(${deg}deg)`,
                    width:'100%',
                    height:'520px',
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
                <img src={'/ajax/invoice/attachment/'+items[nowLocal].type+'/'+items[nowLocal].id} style={{maxHeight:'520px',margin:'0 auto',cursor:'move',display:'block'}}/>
              </li>
            </ul>
            <ModalBtn>
              <LeftToBtn onClick={()=>{this.turn(-1)}}/>
              <ShrinkBtn onClick={()=>{this.scaleFnc(-0.5)}}/>
              <LeftBtn onClick={()=>{this.transForm(-90)}}/>
              <RestoreBtn onClick={()=>{
                this.setState({deg:0,scale:1});
                this.img.style.left = 0;
                this.img.style.top = 0;
              }}
              />
              <RightBtn onClick={()=>{this.transForm(90)}}/>
              <ZoomBtn onClick={()=>{this.scaleFnc(0.5)}}/>
              <RightToBtn onClick={()=>{this.turn(1)}}/>
            </ModalBtn>
          </SliderCon>
        </Modal>
      </div>
    )
  }

}


export default PictureScaleModal;
