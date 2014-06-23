# Copyright (c) 2013 The Native Client Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

#
# GNU Make based build file.  For details on GNU Make see:
# http://www.gnu.org/software/make/manual/make.html
#

#
# Get pepper directory for toolchain and includes.
#
# If NACL_SDK_ROOT is not set, then assume it can be found three directories up.
#
THIS_MAKEFILE := $(abspath $(lastword $(MAKEFILE_LIST)))
NACL_SDK_ROOT ?= $(abspath $(dir $(THIS_MAKEFILE))../..)

# Project Build flags
WARNINGS := -Wno-long-long -Wall -Wswitch-enum -pedantic -Werror
CXXFLAGS := -pthread -std=gnu++11 $(WARNINGS)

# Path
PATHPNACL = ../instance

#
# Compute tool paths
#
GETOS := python $(NACL_SDK_ROOT)/tools/getos.py
OSHELPERS = python $(NACL_SDK_ROOT)/tools/oshelpers.py
OSNAME := $(shell $(GETOS))
RM := $(OSHELPERS) rm

PNACL_TC_PATH := $(abspath $(NACL_SDK_ROOT)/toolchain/$(OSNAME)_pnacl)
PNACL_CXX := $(PNACL_TC_PATH)/bin/pnacl-clang++ -std=c++11
GCC_CXX := g++
CLANG_CXX := clang++
EMS_CXX := /home/butch/Documents/Work/nacl_sdk/pepper_31/pepper.js/emscripten/emcc
PNACL_AR := $(PNACL_TC_PATH)/bin/pnacl-ar
PNACL_RANLIB := $(PNACL_TC_PATH)/bin/pnacl-ranlib
PNACL_FINALIZE := $(PNACL_TC_PATH)/bin/pnacl-finalize
CXXFLAGS := -I$(NACL_SDK_ROOT)/include -I$(NACL_SDK_ROOT)/toolchain/linux_pnacl/usr/local/include/freetype2
LDFLAGS := -L$(NACL_SDK_ROOT)/lib/pnacl/Release -lppapi_cpp -lppapi -ljsoncpp -lpthread -lppapi_gles2 
#-lfreetype -lz
LDFLAGSEMS := -L$(NACL_SDK_ROOT)/lib/emscripten/Release -lppapi_cpp -lppapi -lppapi_gles2

#
# Disable DOS PATH warning when using Cygwin based tools Windows
#
CYGWIN ?= nodosfilewarning
export CYGWIN

# main goals

.PHONY: all clean

all:

clean: 
	rm -rf *.o
	rm -rf *.a
	rm $(PATHPNACL)/windows-nacl.bc
	rm $(PATHPNACL)/windows-nacl.pexe

# test

#windows-ems: InitApp.cc
#	$(EMS_CXX) InitApp.cc -o windows-ems.js $(CXXFLAGS) $(LDFLAGSEMS)

#windows-ems-html: InitApp.cc
#	$(EMS_CXX) InitApp.cc -o windows-ems.html $(CXXFLAGS) $(LDFLAGSEMS)

windows-nacl.bc: CreateModule.cc
	$(PNACL_CXX) -o $(PATHPNACL)/$@ $< -O2 $(CXXFLAGS) $(LDFLAGS)

windows-nacl.pexe: windows-nacl.bc
	$(PNACL_FINALIZE) -o $(PATHPNACL)/$@ $(PATHPNACL)/$<

#windows: windows-nacl windows-clang windows-gcc windows-ems
windows: windows-nacl.pexe