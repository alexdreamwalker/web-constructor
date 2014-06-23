//	define colors for app
Color arrColor[] = {	Color(0.85f, 0.85f, 0.85f),
						Color(0.0f, 0.0f, 0.0f),
						Color(0.25f, 1.0f, 0.0f)
					};
std::vector<Color> colors(arrColor, arrColor + sizeof(arrColor) / sizeof(Color));

//	types objects
#define POINT_TYPE 0
#define POLYGON_TYPE 1
#define CUBIC_SPLINE_TYPE 2
#define AKIMA_SPLINE_TYPE 3
#define CURVE_TYPE 4
#define ERMIT_SPLINE_TYPE 5

//	indicies in array for objects
#define GRID_COLOR_INDEX 0
#define POINT_COLOR_INDEX 1
#define POINT_COLOR_LIGHT_INDEX 2

// define constants for actions
#define ACTION_NONE -1
#define ACTION_PAINT_GRID 0
#define ACTION_POLYGON 1
#define ACTION_CUBIC_SPLINE 2
#define ACTION_AKIMA_SPLINE 3
#define ACTION_CURVE 4
#define ACTION_LIGHT_POINTS 5
#define ACTION_SET_COLOR 6
#define ACTION_SET_FLAG_ROUND 7
#define ACTION_DELETE_SET 8
#define ACTION_SET_LINE_WIDTH 9
#define ACTION_CREATE_OBJECT 10
#define ACTION_DELETE_OBJECT 11
#define ACTION_HIDE_SETS 12
#define ACTION_AREA_REC 13
#define ACTION_ERROR_ANALYSIS 14
#define ACTION_GET_IMG 15

//	define mouse buttons

#define BTN_MOUSE_NONE -1
#define BTN_MOUSE_LEFT 0
#define BTN_MOUSE_RIGHT 1
#define BTN_MOUSE_MIDDLE 2

// define constnts for detail action
#define ADD_POINT_POLYGON 2
#define MOVE_POINT 3

//	indicies buffers
GLenum typeObjects[] = {GL_LINES, GL_POINTS};
GLuint typeLines[] = {POLYGON_TYPE, POINT_TYPE}; 

#define COUNT_DEFAULT_OBJECTS 2
#define GRID 0
#define POINTS 1

// name splines
#define CUBIC_SPLINE 0
#define AKIMA_SPLINE 1
#define ERMIT_SPLINE 2
#define CURVE 3

// number pi
#define M_PI 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679 

// eps for action
#define EPS_MOVE_POINT 0.02
#define EPS_BUILD_SPLINE 0.001

//	ratio openGL and real size
#define RATIO_STEP_SIZE 50 // 0.1 openGL = 50sm
#define GL_STEP 0.1 // 0.1 step GL

// min count point for spline
#define MIN_COUNT_SPLINE_POINT 3

//	defaults const line width
#define DEFAULT_LINE_WIDTH 1.0
#define BOLD_LINE_WIDTH 2.0

//	define 
#define GEALAN_S_3000 1
#define GEALAN_S_8000_IQ 2
#define WARM_LINE_WL_62 3
#define WARM_LINE_WL_74 4
#define AL_COOL 5
#define AL_HOT 6
#define GLASS_1 7
#define GLASS_2 8
#define GLASS_3 9