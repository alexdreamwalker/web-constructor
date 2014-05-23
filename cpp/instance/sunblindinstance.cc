// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/// @file hello_tutorial.cc
/// This example demonstrates loading, running and scripting a very simple NaCl
/// module.  To load the NaCl module, the browser first looks for the
/// CreateModule() factory method (at the end of this file).  It calls
/// CreateModule() once to load the module code.  After the code is loaded,
/// CreateModule() is not called again.
///
/// Once the code is loaded, the browser calls the CreateInstance()
/// method on the object returned by CreateModule().  It calls CreateInstance()
/// each time it encounters an <embed> tag that references your NaCl module.
///
/// The browser can talk to your NaCl module via the postMessage() Javascript
/// function.  When you call postMessage() on your NaCl module from the browser,
/// this becomes a call to the HandleMessage() method of your pp::Instance
/// subclass.  You can send messages back to the browser by calling the
/// PostMessage() method on your pp::Instance.  Note that these two methods
/// (postMessage() in Javascript and PostMessage() in C++) are asynchronous.
/// This means they return immediately - there is no waiting for the message
/// to be handled.  This has implications in your program design, particularly
/// when mutating property values that are exposed to both the browser and the
/// NaCl module.

#include "instance.cc"
#include "../classes/sunblind/horizontalfactory.cc"
#include "../classes/sunblind/verticalfactory.cc"
#include "../classes/sunblind/multifactory.cc"

#define COUNT_SUNBLIND 1

#define VERTICAL_SUNBLIND 1
#define HORIZONTAL_SUNBLIND 2
#define MULTI_SUNBLIND 3

/// The Instance class.  One of these exists for each instance of your NaCl
/// module on the web page.  The browser will ask the Module object to create
/// a new Instance for each occurrence of the <embed> tag that has these
/// attributes:
///     src="hello_tutorial.nmf"
///     type="application/x-pnacl"
/// To communicate with the browser, you must override HandleMessage() to
/// receive messages from the browser, and use PostMessage() to send messages
/// back to the browser.  Note that this interface is asynchronous.
class SunblindInstance : public ConstructorInstance {
public:
  /// The constructor creates the plugin-side instance.
  /// @param[in] instance the handle to the browser-side plugin instance.
	explicit SunblindInstance(PP_Instance instance) : ConstructorInstance(instance) {
		actions["countSunblinds"] = 1;
	}
	virtual ~SunblindInstance() {}

  /// Handler for messages coming in from the browser via postMessage().  The
  /// @a var_message can contain be any pp:Var type; for example int, string
  /// Array or Dictinary. Please see the pp:Var documentation for more details.
  /// @param[in] var_message The message posted by the browser.
	virtual void HandleMessage(const pp::Var& var_message) {
    // TODO(sdk_user): 1. Make this function handle the incoming message.
		if(!var_message.is_string())
			return; 
		std::string message = var_message.AsString();
    // parse JSON data
		reader.parse(message, root);
		std::string action = root.get("action", "undefined").asString();
    // make task and get a response
		int task = actions[action];
		switch(task) {

			case COUNT_SUNBLIND: {
				int type = root["data"].get("type", 0).asInt();
				switch(type) {
					
					case VERTICAL_SUNBLIND: {
						Factory* factory = new VerticalFactory();
						Construction* sunblind = factory->fromJSON(writer.write(root["data"]));
						std::map<std::string, float> price = sunblind->calculate();

						root["data"].clear();
						for(std::map<std::string, float>::iterator it = price.begin(); it != price.end(); ++it) 
							root["data"][it->first] = it->second; 
						delete sunblind;
						delete factory;
						break;
					}

					case HORIZONTAL_SUNBLIND: {
						Factory* factory = new HorizontalFactory();
						Construction* sunblind = factory->fromJSON(writer.write(root["data"]));
						std::map<std::string, float> price = sunblind->calculate();

						root["data"].clear();
						for(std::map<std::string, float>::iterator it = price.begin(); it != price.end(); ++it) 
							root["data"][it->first] = it->second; 
						delete sunblind;
						delete factory;
						break;
					}

					case MULTI_SUNBLIND: {
						Factory* factory = new MultiFactory();
						Construction* sunblind = factory->fromJSON(writer.write(root["data"]));
						std::map<std::string, float> price = sunblind->calculate();

						root["data"].clear();
						for(std::map<std::string, float>::iterator it = price.begin(); it != price.end(); ++it) 
							root["data"][it->first] = it->second; 
						delete sunblind;
						delete factory;
						break;
					}

					default:
					break;
				}
				break;
			}
			default:
			break;
		}
    // send a response
		root["action"] = action;
		std::string output = writer.write(root);
		pp::Var var_reply;
		var_reply = pp::Var(output);
		PostMessage(var_reply);
	}
};

/// The Module class.  The browser calls the CreateInstance() method to create
/// an instance of your NaCl module on the web page.  The browser creates a new
/// instance for each <embed> tag with type="application/x-pnacl".
class SunblindModule : public ConstructorModule {
public:
	SunblindModule() : ConstructorModule() {}
	virtual ~SunblindModule() {}

  /// Create and return a HelloTutorialInstance object.
  /// @param[in] instance The browser-side instance.
  /// @return the plugin-side instance.
	virtual pp::Instance* CreateInstance(PP_Instance instance) {
		return new SunblindInstance(instance);
	}
};

namespace pp {
/// Factory function called by the browser when the module is first loaded.
/// The browser keeps a singleton of this module.  It calls the
/// CreateInstance() method on the object you return to make instances.  There
/// is one instance per <embed> tag on the page.  This is the main binding
/// point for your NaCl module with the browser.
	Module* CreateModule() {
		return new SunblindModule();
	}
}  // namespace pp
