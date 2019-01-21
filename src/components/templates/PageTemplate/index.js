import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	background: #F7FBFF;
	min-height:100vh;
  -webkit-transition:all .2s ease;
  transition:all .2s ease;
  position:relative;
`;
const Content = styled.div`
	padding:10px 16px 30px;
	overflow:hidden;
  position:relative;
  background:#F7FBFF;
`;

const PageTemplate = (props) => {
  return (
    <Wrapper style={{paddingLeft:props.showBar?(props.collectionStop===false?200:75):0}}>
    	<Content {...props}/>
    </Wrapper>
  )
};

export default PageTemplate
