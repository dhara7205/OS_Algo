
const Card = (props) => {
  return (
    <div>
        <h1 className="text-2xl bg-white p-5 rounded-full hover:bg-slate-300">{props.name}</h1>
    </div>
  )
}

export default Card