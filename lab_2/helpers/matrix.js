/**
 * Multi each item in matrix to coefficient
 * @param {[number[]]} matrix
 * @param {[number[]]} coefficients
 * @return {[number[]]} matrix mult to coefficients
 */
const multCoefficients = ({matrix, coefficients}) => (
    matrix.map((row, rowIndex) => (
        row.map((item, columnIndex) => {
            /*
            Matrix and coefficients look like
            [
            // col  col  col
              [a11, a12, a13], // row
              [a21, a22, a23], // row
              [a31, a32, a33], // row
            ]
            So, rowIndex is y, and columnIndex is x.
             */
            const y = rowIndex;
            const x = columnIndex;
            const coefficient = coefficients[y][x];
            return item * coefficient;
        })
    ))
);

/**
 *
 * @param {[number[]]} matrix
 * @return {boolean} isValid
 */
const isSquareMatrix = (matrix) => {
    const rowCount = matrix.length;
    return matrix.every(row => row.length === rowCount);
};

// DETERMINANT SECTION
/**
 *
 * @param {[number[]]} matrix
 * @return {number}
 */
const determinantTwoSizeMatrix = (matrix) => {
    const [
        [a, b],
        [c, d],
    ] = matrix;

    return a * d - b * c;
};

/**
 *
 * @param {[number[]]} matrix
 * @param {number} rowIndex starts from 0
 * @param {number} columnIndex starts from 0
 * @return {[number[]]} minor
 */
const getMinor = ({matrix, rowIndex, columnIndex}) => (
    // remove same row
    matrix.filter((row, y) => (rowIndex !== y))
        .map((row) => (
            // remove same column
            row.filter((item, x) => (
                columnIndex !== x
            ))
        ))
);

/**
 *
 * @param {[number[]]} matrix
 * @param {number} rowIndex starts from 0
 * @param {number} columnIndex starts from 0
 * @return {{minor: [number[]], sign: number}}
 */
const getAlgebraicComplement = ({matrix, rowIndex, columnIndex}) => ({
    minor: getMinor({matrix, rowIndex, columnIndex}),
    sign: ((rowIndex + 1) + (columnIndex + 1)) % 2 ? -1 : 1,
});

/**
 *
 * @param {[number[]]} matrix
 * @return {number} determinant
 */
const determinantMoreThanTwoSizeMatrix = (matrix) => {
    const size = matrix.length;
    if (size === 2) {
        return determinantTwoSizeMatrix(matrix);
    } else {
        const [firstRow] = matrix;
        const rowIndex = 0; // rowIndex is y
        const itemComplementPairs = firstRow.map((item, columnIndex) => ({
                item,
                // columnIndex is x
                ...getAlgebraicComplement({matrix, rowIndex, columnIndex})
            }
        ));
        return itemComplementPairs.reduce((sum, {item, minor, sign}) => (
            sum + (item * sign * determinantMoreThanTwoSizeMatrix(minor))
        ), 0);
    }
};

/**
 *
 * @param {[number[]]} matrix
 * @return {number|null} determinant or null
 */
const calcMatrixDeterminant = (matrix) => {
    const isValid = isSquareMatrix(matrix);
    return isValid
        ? determinantMoreThanTwoSizeMatrix(matrix)
        : null;
};

// DETERMINANT SECTION END

/**
 *
 * @param {[number[]]} matrix
 * @return {number} sum
 */
const getMatrixSum = (matrix) => {
    return matrix.reduce((sum, row) => {
        const rowSum = row.reduce((sumForRow, element) => sumForRow + element, 0);
        return sum + rowSum;
    }, 0);
}

/**
 *
 * @param {[number[]]} matrix
 * @param {number} rowIndex starts from 0
 * @param {number} columnIndex starts from 0
 * @param {number} size selected matrix area size. Should be odd
 * @return {[number[]]|null}
 */
const getItemsAround = ({matrix, rowIndex, columnIndex, size}) => {
    const isValidSize = size % 2;
    if (isValidSize) {
        // if size is 3, sizeToDirection = 1, as we should select one item in each size to get 3 sized matrix
        const sizeToDirection = (size - 1) / 2;
        // select rows from item in sizeToDirection
        const area = matrix.filter((row, y) => Math.abs(rowIndex - y) <= sizeToDirection)
            .map((row) => (
                // select items in row from item in sizeToDirection
                row.filter((item, x) => (
                    Math.abs(columnIndex - x) <= sizeToDirection
                ))
            ));
        const isAreaValid = isSquareMatrix(area) && area.length === size;
        return isAreaValid ? area : null;
    } else {
        return null;
    }
}

export {
    multCoefficients,
    isSquareMatrix,
    determinantTwoSizeMatrix,
    getMinor,
    getAlgebraicComplement,
    determinantMoreThanTwoSizeMatrix,
    calcMatrixDeterminant,
    getItemsAround,
    getMatrixSum,
}