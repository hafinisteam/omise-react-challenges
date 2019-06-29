import React, { useState } from "react";
import { useTransition } from "react-spring";
import { UIButton } from "~/components/presentation/ui/button";
import UICard from "~/components/presentation/ui/commons/UICard";
import OverlayUnit, {
  OverlayWrapper
} from "~/components/presentation/CharityList/OverlayUnit";
import enhance from "./withCharityItem";

const CharityItem = props => {
  const { charity, handlePay, handleRadio, handleSelect, handleReset } = props;
  const { amount, currency } = props;

  const [showOverlay, setOverlay] = useState(false);

  const transition = useTransition(showOverlay, null, {
    from: { o: 0, scale: 1.1 },
    enter: { o: 1, scale: 1 },
    leave: { o: 0, scale: 1.1 }
  });

  function closeOverlay() {
    setOverlay(false);
    handleReset();
  }

  function payDonation() {
    setOverlay(false);
    handlePay();
	}

	//dynamic loading image from resource
	function loadImage(){
		const images = require.context('../../../static/images', true);
		return images('./' + props.charity.image);
	}

	const charityImg = loadImage();

  return (
    <UICard
      image={charityImg}
      title={charity.name}
      extraTitle={<UIButton onClick={() => setOverlay(true)}>Donate</UIButton>}
      overlay={() =>
        transition.map(
          ({ item, props: aniProps, key }) =>
            item && (
              <OverlayWrapper
                key={key}
                style={{
                  opacity: aniProps.o,
                  transform: aniProps.scale.interpolate(s => `scale(${s})`)
                }}
              >
                <OverlayUnit
                  value={amount}
                  currency={currency}
                  onChangeRadio={handleRadio}
                  onSelect={handleSelect}
                  onCloseOverlay={closeOverlay}
                  onPayDonation={payDonation}
                />
              </OverlayWrapper>
            )
        )
      }
    />
  );
};

export default enhance(CharityItem);
