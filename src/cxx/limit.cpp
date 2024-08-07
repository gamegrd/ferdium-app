#include <iostream>
#include <string>
#include <thread>
#ifdef _WIN32
// Windows 平台
#include <windows.h>
#include <tlhelp32.h>
#include <psapi.h> // Include Psapi.h for GetModuleFileNameEx

#pragma comment(lib, "Psapi.lib") // Link against Psapi.lib
void LimitMemoryUsageIfRuyiAIProcess(DWORD processId)
{
    HANDLE processHandle = OpenProcess(PROCESS_ALL_ACCESS, FALSE, processId);
    if (processHandle != NULL)
    {
        // Get process name
        char processName[MAX_PATH];
        if (GetModuleFileNameExA(processHandle, NULL, processName, MAX_PATH) != 0)
        {
            std::string processNameStr = processName;

            // Check if process name matches "RuyiAI.exe"
            if (processNameStr.find("RuyiAI.exe") != std::string::npos)
            {
                // Limit memory usage
                // SetProcessWorkingSetSize(processHandle, 64 * 1024 * 1024, 64 * 1024 * 1024);
                SetProcessWorkingSetSize(processHandle, 128 * 1024 * 1024, 128 * 1024 * 1024);
                std::cout << "Memory usage limited for RuyiAI.exe process with ID: " << processId << std::endl;
                char buffer[0x200];
                sprintf_s(buffer, sizeof(buffer), "Memory usage limited for RuyiAI.exe process with ID: %d", processId);
                OutputDebugStringA(buffer);
            }
        }
        CloseHandle(processHandle);
    }
}

extern "C" __declspec(dllexport) void loop()
{
    while (true)
    {
        OutputDebugStringA("-----xgplugin----");
        // Create snapshot of all processes
        HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snapshot != INVALID_HANDLE_VALUE)
        {
            PROCESSENTRY32 processEntry;
            processEntry.dwSize = sizeof(PROCESSENTRY32);

            // Iterate over all processes
            if (Process32First(snapshot, &processEntry))
            {
                do
                {
                    // Limit memory usage if process name is RuyiAI.exe
                    LimitMemoryUsageIfRuyiAIProcess(processEntry.th32ProcessID);
                } while (Process32Next(snapshot, &processEntry));
            }

            CloseHandle(snapshot);
        }

        Sleep(5000);
    }

    return;
}

bool bInit = false;
void init_limit()
{
    if (!bInit)
    {
        bInit = true;
        std::thread(loop).detach();
    }
}
#elif __linux__
// Linux 平台
void init_limit()
{
}
#elif __APPLE__
// Mac 平台
void init_limit()
{
}
#else
// 其他平台
void init_limit()
{
}
#endif