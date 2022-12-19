import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "store/hook";
import { setCurrentPage } from "store/slices/bookSlice";

const usePagination = (itemsPerPage: number, total: number) => {
    const { currentPage } = useAppSelector(state => state.books);
    const dispatch = useAppDispatch();

    const pageCount = Math.ceil(total / itemsPerPage);

    return {
        currentPage, setCurrentPage: useCallback((newPage: number) => {
            dispatch(setCurrentPage(newPage))
        }, []), pageCount,
    };
};

export default usePagination;
