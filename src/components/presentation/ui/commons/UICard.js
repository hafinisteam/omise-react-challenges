import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import COLOR from "~/utilities/layout/color";
import { mediaMax } from "~/utilities/layout";

const Card = styled.div`
  border-radius: 5px;
  box-shadow: -1px 5px 6px -2px #66728852;
  border: 1px solid #f2f2f2;
  overflow: hidden;
  position: relative;
`;


const CardMedia = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  img {
    width: 100%;
  }
  ${mediaMax.xl`
    height: 200px;
  `}
  ${mediaMax.md`
    height: 150px;
  `}
`;

CardMedia.displayName = "CardMedia";

export const CardBody = styled.div`
	position: relative;
	background: ${COLOR.white};
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.card-title {
		font-size: 16px;
		font-weight: 600;
		color: ${COLOR.gray};
		margin-bottom: 0;
	}
	${mediaMax.xl`
    padding: 10px;
  `}
	${mediaMax.md`
    .card-title {
      font-size: 14px;
    }
  `}
	${mediaMax.sm`
    .card-title {
      font-size: 16px;
    }
  `}
`;

CardBody.displayName = "CardBody";

const UICard = props => {
  const { image, title, extraTitle, overlay } = props;
  return (
    <Card>
      {image && (
        <CardMedia>
          <img src={image} />
        </CardMedia>
      )}
      <CardBody>
        <h3 className="card-title">{title}</h3>
        {extraTitle && <div>{extraTitle}</div>}
      </CardBody>
      {overlay()}
    </Card>
  );
};

UICard.defaultProps = {
  image: null,
  title: "Card title",
  extraTitle: null,
  overlay: () => {}
};

UICard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  extraTitle: PropTypes.object
};

export default UICard;
