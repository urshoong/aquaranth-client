import { lazy } from "react";
import BOARD from "@pages/MODULE/BOARD";
import CALENDER from "@pages/MODULE/CALENDER";
import DRIVE from "@pages/MODULE/DRIVE";
import MAIL from "@pages/MODULE/MAIL";
import MAIN from "@pages/MODULE/MAIN";
<<<<<<< HEAD
import group from "./MODULE/SYS/ORGA/ORGA0010/pages/group";
=======
import group from "@pages/MODULE/SYS/ORGA/ORGA0010/pages/group/Group";
import Group from "@pages/MODULE/SYS/ORGA/ORGA0010/pages/Group";
>>>>>>> 99dcdd4bb50b78dc0b204c91fe0faa4b448df44e

/**
 * FIXME : 동적으로 주입하는 방법 찾기
 * @type {React.LazyExoticComponent<function(): *>}
 */
const ORGA0010 = lazy(() => import("@pages/MODULE/SYS/ORGA/ORGA0010"));
const ORGA0020 = lazy(() => import("@pages/MODULE/SYS/ORGA/ORGA0020"));
const ORGA0030 = lazy(() => import("@pages/MODULE/SYS/ORGA/ORGA0030"));
const ROLE0010 = lazy(() => import("@pages/MODULE/SYS/ROLE/ROLE0010"));
const ROLE0020 = lazy(() => import("@pages/MODULE/SYS/ROLE/ROLE0020"));
const ROLE0030 = lazy(() => import("@pages/MODULE/SYS/ROLE/ROLE0030"));

const routes = [
  /**
   * 기본 모듈
   */
  {
    path: "/",
    module: MAIN,
  },
  {
    path: "/board",
    module: BOARD,
  },
  {
    path: "/calender",
    module: CALENDER,
  },
  {
    path: "/drive",
    module: DRIVE,
  },
  {
    path: "/mail",
    module: MAIL,
  },
  /**
     * 회사
     * @Author 강도영
     */
  {
    path: "/SYS/ORGA/ORGA0010",
    module: ORGA0010,
  },

  {
    path: "/SYS/ORGA/ORGA0010/group",
    module: group,
  },

<<<<<<< HEAD
=======
  {
    path: "/SYS/ORGA/ORGA0010/group",
    module: Group,
  },

>>>>>>> 99dcdd4bb50b78dc0b204c91fe0faa4b448df44e
  /**
     * 부서
     * @Author 박경민
     */
  {
    path: "/SYS/ORGA/ORGA0020",
    module: ORGA0020,
  },
  /**
     * 사원 관리
     * @Author 정수연
     */
  {
    path: "/SYS/ORGA/ORGA0030",
    module: ORGA0030,
  },
  /**
     * 권한 그룹
     * @Author 임종현
     */
  {
    path: "/SYS/ROLE/ROLE0010",
    module: ROLE0010,
  },
  /**
     * 사용자 권한 설정
     * @Author 박준성
     */
  {
    path: "/SYS/ROLE/ROLE0020",
    module: ROLE0020,
  },
  /**
     * 메뉴 사용 설정
     * @Author 김민준
     */
  {
    path: "/SYS/ROLE/ROLE0030",
    module: ROLE0030,
  },
];

export default routes;
