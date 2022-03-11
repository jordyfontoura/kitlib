import { overload as asyncForEach } from './asyncForEach';
import { overload as asyncMap } from './asyncMap';
import { overload as asyncReduce } from './asyncReduce';
import { overload as uniquify } from './uniquify';

export default function overload() {
  asyncReduce();
  asyncMap();
  asyncForEach();
  uniquify();
}
