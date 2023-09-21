import os
import sys
import shutil

package_dir = os.path.join(os.path.dirname(__file__), 'package','src')
example_dir = os.path.join(os.path.dirname(__file__), 'example','src','components','form-builder-mui')

def check_sync():
    # check if package and example are in sync
    package_files = os.listdir(package_dir)
    example_files = os.listdir(example_dir)
    if len(package_files) != len(example_files):
        print('package and example are not in sync')
        print('# package files: ', len(package_files))
        print('# example files: ', len(example_files))
        return
    for package_file in package_files:
        if package_file not in example_files:
            print('package and example are not in sync')
            print('package file not in example: ', package_file)
            return
    for example_file in example_files:
        if example_file not in package_files:
            print('package and example are not in sync')
            print('example file not in package: ', example_file)
            return
    
    # check the contents of each file are the same
    for package_file in package_files:
        package_file_path = os.path.join(package_dir, package_file)
        example_file_path = os.path.join(example_dir, package_file)
        package_file_contents = open(package_file_path, 'r').read()
        example_file_contents = open(example_file_path, 'r').read()
        # get file name from package_file_path
        file_name = package_file_path.split('/')[-1].split('\\')[-1]
        if package_file_contents != example_file_contents:
            print('package and example are not in sync')
            print('package file', package_file_path.split('/')[-1].split('\\')[-1], 'contents do not match example file', example_file_path.split('/')[-1].split('\\')[-1])
            return
    print('package and example are in sync')

def sync_package_to_example_folders():
    # copy package to example
    shutil.rmtree(example_dir, ignore_errors=True)
    shutil.copytree(package_dir, example_dir)

def sync_example_to_package_folders():
    # copy example to package
    shutil.rmtree(package_dir, ignore_errors=True)
    shutil.copytree(example_dir, package_dir)


if __name__ == '__main__':
    arguments = {
        '--package-to-example': sync_package_to_example_folders,
        '--example-to-package': sync_example_to_package_folders,
        '--check-sync': check_sync,
    }
    # if no arguments run check_sync
    if len(sys.argv) == 1:
        check_sync()
    elif(sys.argv[1] in arguments):
        arguments[sys.argv[1]]()
    else:
        print('invalid argument')
        print("valid arguments: --package-to-example, --example-to-package, --check-sync, or no arguments")

