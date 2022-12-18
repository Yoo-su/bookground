import { Wrapper } from "./styles";
import Pagination from '@mui/material/Pagination';

interface Props {
    pageCount: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
    currentPage: number;
}
const Paginator = ({
    pageCount, onPageChange, currentPage,
}: Props) => {

    return (
        <Wrapper>
            <Pagination
                count={pageCount}
                onChange={onPageChange}
                page={currentPage}
                color="primary"
                showFirstButton
                showLastButton

            />
        </Wrapper>
    );
};

export default Paginator;