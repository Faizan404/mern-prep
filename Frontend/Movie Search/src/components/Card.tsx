import Rating from "./Rating";

function Card({
  title,
  release,
  src,
}: {
  title: string;
  release: string;
  src: string;
}) {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-xl">
      <figure>
        <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Release Date: {release}</p>
        <div className="card-actions justify-end">
          <Rating />
        </div>
      </div>
    </div>
  );
}
export default Card;
