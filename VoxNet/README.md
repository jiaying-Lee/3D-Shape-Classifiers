Here is how we use `binvox` in our local machine. 

 
1.   Download the `ModelNet10.zip` to our local and unzip it.
2.   Download the `binvox.exe` to our local.
3.   Open `cmd` and use `cd` to get into the ModelNet10 folder 
 
4.   `cd` to each subfolder that contains `.off` files. (eg. bathtub/test)
*   Run `for %i in (*.off) do BINVOXPATH -cb -e -c -d 30 "%i"` (eg.for %i in (*.off) do C:\Users\Downloads\binvox.exe -cb -e -c -d 30 "%i")
*   Run `del *.off`
