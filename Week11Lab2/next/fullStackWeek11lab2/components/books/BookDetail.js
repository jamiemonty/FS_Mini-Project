import classes from './BookDetail.module.css'

function BookDetail(props) {
    return (
        <section className={classes.detail}>
            <img src={props.image} alt={props.title} />
            <h1>{props.title}</h1>
            <h2>by {props.author}</h2>
            <p>Published: {props.publishedDate}</p>
            <p>{props.description}</p>
        </section>
    )
}

export default BookDetail