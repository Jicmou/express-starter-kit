import EExpressRequestMethod from '../router/request-method.enum';
import FUNCTION_STUB from './function.stub';
import { IExpress } from '../deps.type';

const EXPRESS_APP_STUB: IExpress = {
  [EExpressRequestMethod.ALL]: FUNCTION_STUB,
  [EExpressRequestMethod.CHECKOUT]: FUNCTION_STUB,
  [EExpressRequestMethod.COPY]: FUNCTION_STUB,
  [EExpressRequestMethod.DELETE]: FUNCTION_STUB,
  [EExpressRequestMethod.GET]: FUNCTION_STUB,
  [EExpressRequestMethod.HEAD]: FUNCTION_STUB,
  [EExpressRequestMethod.LOCK]: FUNCTION_STUB,
  [EExpressRequestMethod.M_SEARCH]: FUNCTION_STUB,
  [EExpressRequestMethod.MERGE]: FUNCTION_STUB,
  [EExpressRequestMethod.MKACTIVITY]: FUNCTION_STUB,
  [EExpressRequestMethod.MKCOL]: FUNCTION_STUB,
  [EExpressRequestMethod.MOVE]: FUNCTION_STUB,
  [EExpressRequestMethod.NOTIFY]: FUNCTION_STUB,
  [EExpressRequestMethod.OPTIONS]: FUNCTION_STUB,
  [EExpressRequestMethod.PATCH]: FUNCTION_STUB,
  [EExpressRequestMethod.POST]: FUNCTION_STUB,
  [EExpressRequestMethod.PURGE]: FUNCTION_STUB,
  [EExpressRequestMethod.PUT]: FUNCTION_STUB,
  [EExpressRequestMethod.REPORT]: FUNCTION_STUB,
  [EExpressRequestMethod.SEARCH]: FUNCTION_STUB,
  [EExpressRequestMethod.SUBSCRIBE]: FUNCTION_STUB,
  [EExpressRequestMethod.TRACE]: FUNCTION_STUB,
  [EExpressRequestMethod.UNLOCK]: FUNCTION_STUB,
  [EExpressRequestMethod.UNSUBSCRIBE]: FUNCTION_STUB,
  listen: FUNCTION_STUB as any,
};

export default EXPRESS_APP_STUB;
