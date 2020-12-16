Open `Voxnet.ipynb` to check and run the VoxNet model on ModelNet10.

In the loading data part, it will needs you to upload the ModelNet10 in `.binvox` format. You can either just upload `ModelNet10_binvox.zip` or try to transform all the `.off` files in ModelNet10 with the following steps:
 
For Windows user, Here is how we use `binvox` in our local (Windows) machine. 

1.   Download the `ModelNet10.zip` to our local and unzip it. (http://3dvision.princeton.edu/projects/2014/3DShapeNets/ModelNet10.zip)
2.   Download the `binvox.exe` to our local.
3.   Open `cmd` and use `cd` to get into the ModelNet10 folder 
 
4.   `cd` to each subfolder that contains `.off` files. (eg. bathtub/test)
*   Run `for %i in (*.off) do BINVOXPATH -cb -e -c -d 30 "%i"` (eg.for %i in (*.off) do C:\Users\Downloads\binvox.exe -cb -e -c -d 30 "%i")
*   Run `del *.off`

For other user, you might need to follow the instruction here (https://www.patrickmin.com/binvox/) to process the `.off` files.

After finish converting all the `off` files to `.binvox` files, upload it in `Voxnet.ipynb` and continue to run the remaining code. 


`ModelNet10_binvox.zip` contains all the reformat `binvox` data of ModelNet10 

`modelnet10.npz` is the npz file contains the wrapped training data and testing data. You can also try to upload this npz file in `Voxnet.ipynb` and then skip all the data wrapping code. 
