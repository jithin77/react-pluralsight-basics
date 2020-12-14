import { MgtTemplateProps } from '@microsoft/mgt-react';

 const MyPeople = ( props:MgtTemplateProps) => {
  console.log(props.dataContext) ;
  //return <div>{event.subject}</div>;
};

export default MyPeople;