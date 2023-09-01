export default function ReviewCard() {
  return (
    <>
      <div className="flex flex-row items-start py-4 gap-4">
        <img
          className="w-20 rounded-sm border-2 border-beeBrownLight"
          src="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg?v=aae03975f7"
          alt=""
        />
        <div className="review-info">
          <div className="film-title flex flex-row items-end gap-3">
            <span>Film name</span> <span className="opacity-50">year</span>
          </div>
          <div className="rating-and-date flex flex-row items-end gap-3">
            <span>Rating</span>
            <span className="opacity-50">Watched at</span>
          </div>
          <p className="review-description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            voluptatibus quos. Tempora accusamus culpa voluptatibus distinctio
            cumque quibusdam ad neque perspiciatis quia sed, adipisci labore
            nisi natus impedit. Quas, quos.
          </p>
        </div>
      </div>
    </>
  );
}
