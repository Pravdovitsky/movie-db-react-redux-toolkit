import Paginator from '../Pagination/Paginator';
import Film from './Film';
import React, {useCallback, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {dataSelector, filmsSelector, totalPageSelector} from '../store/selectors';
import {fetchList} from '../store/toolkitSlice';
import style from './MovieList.module.css'
import paginate from './Pagination.module.css'


const MovieList = () => {
    const history = useHistory();
    const {page} = useParams();
    const currentPage = page || 1;
    const dispatch = useDispatch();
    const {status, error} = useSelector(dataSelector);
    const filmList = useSelector(filmsSelector);
    const totalPage = useSelector(totalPageSelector);

    useEffect(() => {
            dispatch(fetchList(currentPage));
        }, [dispatch, currentPage]
    );

    const changePage = useCallback(
        ({selected}) => {
            history.push(`/${selected + 1}`);
        }, [history]
    );

    return (
        <>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error has occurred: {error}</h2>}
            <div className={style.list}>
                {
                    filmList.map(item => (
                        <Film
                            currentPage={currentPage}
                            key={item.id}
                            item={item}/>
                    ))
                }
            </div>
            <Paginator
                pageCount={totalPage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={5}
                previousLabel={'<'}
                nextLabel={'>'}
                onPageChange={changePage}
                containerClassName={paginate.pagination}
                activeClassName={paginate.active}
            />
        </>
    )
}

export default MovieList;