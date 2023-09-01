interface Props {
  imageGap: string;
  imageWidth: string;
  listTitle?: string;
  numberOfFilms?: number;
}

export default function ListCard({
  imageGap,
  imageWidth,
  listTitle,
  numberOfFilms,
}: Props) {
  const imageStyle = `${imageWidth} rounded-sm border-beeBrownLight border-2 `;
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`film-posters flex flex-row items-center ${imageGap} py-4`}
        >
          <img
            className={imageStyle}
            src="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7"
            alt=""
          />
          <img
            className={imageStyle}
            src="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7"
            alt=""
          />
          <img
            className={imageStyle}
            src="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7"
            alt=""
          />
          <img
            className={imageStyle}
            src="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7"
            alt=""
          />
        </div>
        {listTitle && numberOfFilms ? (
          <div className="flex flex-row">
            {" "}
            <span>{listTitle}</span>
            <span>
              {numberOfFilms} {numberOfFilms > 1 ? "films" : "film"}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
