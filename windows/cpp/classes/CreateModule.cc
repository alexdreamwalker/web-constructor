#ifndef CREATEMODULE
#define CREATEMODULE

#include "ppapi/cpp/graphics_3d.h"
#include "ppapi/cpp/rect.h"
#include "ppapi/cpp/view.h"
#include "ppapi/cpp/module.h"
#include "ppapi/cpp/resource.h"
#include "ppapi/cpp/var.h"
#include "ppapi/cpp/core.h"
#include "ppapi/cpp/file_io.h"
#include "ppapi/cpp/file_ref.h"
#include "ppapi/cpp/file_system.h"
#include "json/json.h"
#include "ppapi/cpp/input_event.h"
#include "ppapi/cpp/instance.h"
#include "json/json.h"
#include "ppapi/lib/gl/gles2/gl2ext_ppapi.h"
#include "ppapi/utility/completion_callback_factory.h"

#include <GLES2/gl2.h>
//#include <ft2build.h>
//#include FT_FREETYPE_H

#include <stdio.h>
#include <algorithm>
#include <stdlib.h>
#include <string>
#include <string.h>
#include <limits.h>
#include <cmath>
#include <stdarg.h>
#include <stddef.h>
#include <iostream>
#include <fstream>
#include <sstream>
#include <errno.h>
#include <typeinfo>
//#include <vector>

#include "custom_events.h"

#include "Converter.h"
#include "Constants.h"
#include "Buffer.h"
#include "Splines/CubicSpline.h"
#include "Splines/AkimaSpline.h"
#include "Splines/Curve.h"
//#include "Splines/Splines.h"
#include "ConstructorInstance.h"
#include "Construction.h"
//#include "Object.h" // Construction.h & Painter.h
//#include "Construction.h"
//#include "Painter.h"
#include "EventHandler.h"

//#include "Components/Glass.h"
//#include "Components/Profile.h"


class ConstructorModule : public pp::Module
{
	public:
  	
  	ConstructorModule() : pp::Module() {}
  	virtual ~ConstructorModule() {}

  virtual pp::Instance* CreateInstance(PP_Instance instance)
  {
    return new EventHandler(instance);
  }
};

namespace pp
{
	Module* CreateModule()
	{
	  return new ConstructorModule();
	}
}

#endif