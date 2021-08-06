import React from 'react';
import { MessageComponentProps } from '../../common/interfaces/message-plugin';
import tinycolor from 'tinycolor2';
import { styled } from '../../webchat-ui/style';
import ThumbIcon from '../../webchat-ui/assets/thumb-up-24dp.svg';

const StyledThumbIcon = styled(ThumbIcon)(({ theme }) => ({
	fill: tinycolor(theme.greyContrastColor).setAlpha(.4).toHslString(),
	verticalAlign: "bottom",
}));

const StyledThumbDownIcon = styled(StyledThumbIcon)({
	transform: "rotate(180deg)",
	verticalAlign: "top",
});

const TextIconWrapper = styled.div(({ theme, addedSpacing }) => ({
	marginBottom: addedSpacing && 6,

	"&>*:last-child": {
		marginLeft: theme.unitSize,
	}
}));

const RatingCommentText = styled.div(({ theme }) => ({
	paddingLeft: theme.unitSize * 2,
	paddingRight: theme.unitSize * 2,
}));

const RatingHistoryEntry = styled.div(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	fontStyle: "italic",
	alignItems: "center",
	fontFamily: theme.fontFamily,
	color: tinycolor(theme.greyContrastColor).setAlpha(.6).toHslString(),
}));

export default ({ message, config }: MessageComponentProps) => {
	const rating = message?.data?._cognigy?.controlCommands?.[0]?.parameters;

	const ratingText = config.settings.ratingMessageHistoryRatingText;
	const commentText = config.settings.ratingMessageHistoryCommentText;

	if (!rating) return null;

	const getRatingIcon = (rating: number) => {
		if (rating === 10) return <StyledThumbIcon />;
		if (rating === 0) return <StyledThumbDownIcon />;

		return rating;
	};

	return (
		<RatingHistoryEntry>
			<TextIconWrapper addedSpacing={rating.rating === 10}>
				<span>{ratingText}</span>
				{getRatingIcon(rating.rating)}
			</TextIconWrapper>

			{
				rating.comment &&
				<RatingCommentText>
					{commentText} {rating.comment}
				</RatingCommentText>
			}
		</RatingHistoryEntry>
	)
};