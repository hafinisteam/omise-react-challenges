import React, { useEffect, useState, useReducer } from "react";
import { compose } from "recompose";
import styled from "styled-components";
import { connect } from "react-redux";
import produce from "immer";

import {
  getCharityList,
  getPaymentList
} from "~/state/ducks/actions/charityPayment";
import { UIButton } from "~/components/presentation/ui/button";
import { message, Spin } from "antd";


const Wrapper = styled.div`
  margin-top: 50px;
`;

const initState = {
  listData: [],
  loading: false
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "load_list":
      draft.loading = true;
      return;
    case "load_success":
      draft.loading = false;
      draft.listData = action.data;
      return;
    case "load_fail":
      draft.loading = false;
      return;
    default:
      return;
  }
});

const CharityList = props => {
  const { getCharityList } = props;
  const [{ listData, loading }, listAction] = useReducer(reducer, initState);

  useEffect(() => {
    listAction({type: 'load_list'});
    try {
      const getList = async () => {
        const charityList = await getCharityList();

        // Delay some seconds to see loading in action
        // setTimeout(() => {
          listAction({type: 'load_success', data: charityList});
        // }, 2000)
      };
      getList();
    } catch (err) {
      listAction({type: 'load_fail'});
      message.error("Error get charity list");
    }
  }, []);

  if(loading){
    return <Spin />
  }

  return (
    <Wrapper>
      {listData.map(l => (
        <img src={`./images/${l.image}`} />
      ))}
    </Wrapper>
  );
};

export default compose(
  connect(
    null,
    {
      getCharityList,
      getPaymentList
    }
  )
)(CharityList);
