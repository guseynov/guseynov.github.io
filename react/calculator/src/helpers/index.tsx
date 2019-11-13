import addition from './addition';
import decimal from './decimal';
import division from './division';
import multiplication from './multiplication';
import substraction from './substraction';
import write from './write';

export default {
    ...addition,
    ...decimal,
    ...division,
    ...multiplication,
    ...substraction,
    ...write
};
