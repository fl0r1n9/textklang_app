import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {visuallyHidden} from '@mui/utils';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

//settings for formatting table head
const headCells = [{
    id: 'title', string: false, disablePadding: false, label: 'Titel',
}, {
    id: 'author', string: false, disablePadding: false, label: 'Autor',
}, {
    id: 'reader', string: false, disablePadding: false, label: 'Leser',
}, {
    id: 'orig', string: false, disablePadding: false, label: 'Dateiname',
},];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (<TableHead>
        <TableRow>
            {headCells.map((headCell) => (<TableCell
                key={headCell.id}
                align={headCell.string ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    {headCell.label}
                    {orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>) : null}
                </TableSortLabel>
            </TableCell>))}
        </TableRow>
    </TableHead>);
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {

    return (<Toolbar>
        <Typography
            sx={{flex: '1 1 100%'}}
            variant="h6"
            id="tableTitle"
            component="div"
        >
            Suchergebnisse
        </Typography>
    </Toolbar>);
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


export default function ContentTable(props) {

    const {setSelectedPoem, searchInput, searchFilter, all_poems_json, conditions} = props;

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = all_poems_json.poems.map((n) => n.title);

            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - all_poems_json.poems.length) : 0;

    const filterResults = (poem) => {
        switch (searchFilter) {
            case 'all':
                if (poem.title.toLowerCase().includes(searchInput.toLowerCase()) || poem.author.toLowerCase().includes(searchInput.toLowerCase()) || poem.reader.toLowerCase().includes(searchInput.toLowerCase())) return true
                for (const token of poem.tokens) {
                    if (token.tokenString.toLowerCase().includes(searchInput.toLowerCase())) {
                        return true
                    }
                }
                return false

            case 'title':

                return poem.title.toLowerCase().includes(searchInput.toLowerCase());

            case 'author':

                return poem.author.toLowerCase().includes(searchInput.toLowerCase());

            case 'reader':

                return poem.reader.toLowerCase().includes(searchInput.toLowerCase());

            case 'text':

                for (const token of poem.tokens) {
                    if (token.tokenString.toLowerCase().includes(searchInput.toLowerCase())) {
                        return true
                    }
                }
                return false

            default:
                return poem.title.toLowerCase().includes(searchInput.toLowerCase()) || poem.author.toLowerCase().includes(searchInput.toLowerCase()) || poem.reader.toLowerCase().includes(searchInput.toLowerCase());

        }
    }

    //array to render when only string search is applied
    const filteredBySearchInput = all_poems_json.poems.filter(poem => filterResults(poem))
    let filteredByConditionInput

    //filter out conditions
    if (conditions.length !== 0) {
        const processConditionsFirst = (poem) => {
            if (conditions[0].conditionSearchInput === '') {
                return true
            }

            for (let i = 0; i < poem.tokens.length; i++) {

                switch (conditions[0].entity) {
                    case 'punctuation':

                        if (isNaN(poem.tokens[i].startTime) && poem.tokens[i].tokenString === conditions[0].conditionSearchInput) {
                            switch (conditions[0].where) {
                                case 'vers_start':
                                    if (poem.tokens[i - 1].newline === '1') {
                                        return true
                                    }
                                    break
                                case 'vers_end':
                                    if (poem.tokens[i].newline === '1') {
                                        return true
                                    }
                                    break
                                case 'wayne':
                                    return true
                                default:
                                    break
                            }
                        }
                        break
                    case 'syl':
                        if (poem.tokens[i].tokenString.includes(conditions[0].conditionSearchInput)) {
                            switch (conditions[0].where) {
                                case 'vers_start':
                                    if (poem.tokens[i - 1].newline === '1') {
                                        return true
                                    }
                                    break
                                case 'vers_end':
                                    if (poem.tokens[i].newline === '1') {
                                        return true
                                    }
                                    break
                                case 'wayne':
                                    return true
                                default:
                                    break
                            }
                        }
                        break
                    case 'word':
                        if (poem.tokens[i].tokenString === conditions[0].conditionSearchInput) {
                            switch (conditions[0].where) {
                                case 'vers_start':
                                    if (poem.tokens[i - 1].newline === '1') {
                                        return true
                                    }
                                    break
                                case 'vers_end':
                                    if (poem.tokens[i].newline === '1') {
                                        return true
                                    }
                                    break
                                case 'wayne':
                                    return true
                                default:
                                    break
                            }
                        }
                        break
                    default:
                        break
                }
            }
        }

        if (conditions[0].func === 'contains') {
            filteredByConditionInput = filteredBySearchInput.filter(poem => processConditionsFirst(poem))
        }
        if (conditions[0].func === 'not') {
            filteredByConditionInput = filteredBySearchInput.filter(poem => !processConditionsFirst(poem))
        }
    }


    return (<Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table style={{marginLeft: "15px"}}
                           sx={{minWidth: 750}}
                           aria-labelledby="tableTitle"
                           size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={all_poems_json.poems.length}
                        />
                        <TableBody>
                            {stableSort((conditions.length !== 0) ? filteredByConditionInput : filteredBySearchInput, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.title);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (<TableRow
                                        hover
                                        onClick={() => setSelectedPoem(all_poems_json.poems.find(poem => poem.documentId === row.documentId))}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.title}
                                        selected={isItemSelected}

                                    >
                                        <TableCell align="left"
                                                   style={{cursor: 'pointer'}}
                                                   component="th"
                                                   id={labelId}
                                                   scope="row"
                                                   padding="none"> {row.title} </TableCell>
                                        <TableCell align="left"
                                                   style={{cursor: 'pointer'}}
                                                   component="th"
                                                   id={labelId}
                                                   scope="row"
                                        >{row.author} </TableCell>
                                        <TableCell align="left"
                                                   style={{cursor: 'pointer'}}
                                                   component="th"
                                                   id={labelId}
                                                   scope="row"
                                        >{row.reader} </TableCell>
                                        <TableCell align="left"
                                                   style={{cursor: 'pointer'}}
                                                   component="th"
                                                   id={labelId}
                                                   scope="row"
                                        >{row.documentId} </TableCell>

                                    </TableRow>);
                                })}
                            {emptyRows > 0 && (<TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6}/>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={(conditions.length !== 0) ? filteredByConditionInput.length : filteredBySearchInput.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Abstände verkleinern"
            />

        </Box>

    );
}